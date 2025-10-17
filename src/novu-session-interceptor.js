/**
 * Novu Session Interceptor
 *
 * This script intercepts calls to the Novu session API and caches the response
 * in window memory with a configurable TTL to prevent unnecessary API calls.
 * Data is stored temporarily and cleared on page reload.
 */
/** biome-ignore-all lint/complexity/noArguments: TODO: Check and fix arguments */
(() => {
  // Default TTL in milliseconds (1 hour)
  const DEFAULT_TTL = 60 * 60 * 1000;

  // Storage variable in window memory
  let sessionData = null;

  // Configuration
  let config = {
    ttl: DEFAULT_TTL,
    debug: false,
  };

  /**
   * Initialize the interceptor with custom configuration
   * @param {Object} customConfig - Configuration options
   * @param {number} customConfig.ttl - Time to live in milliseconds (default: 1 hour)
   * @param {boolean} customConfig.debug - Enable debug logging (default: false)
   */
  function initialize(customConfig = {}) {
    config = { ...config, ...customConfig };

    // Set up the interception
    setupTokenInterception();

    if (config.debug) {
      console.log(
        "Novu Session Interceptor initialized with TTL:",
        config.ttl,
        "ms",
      );
    }
  }

  /**
   * Log debug messages if debug mode is enabled
   * @param {...any} args - Arguments to log
   */
  function logDebug(...args) {
    if (config.debug) {
      console.log("[Novu Interceptor]", ...args);
    }
  }

  /**
   * Store session data in window memory with expiry
   * @param {Object} data - Session data to store
   */
  function storeSessionData(data) {
    sessionData = {
      data: data,
      expiry: Date.now() + config.ttl,
      timestamp: new Date().toISOString(),
    };

    logDebug(
      "Session data stored with expiry at:",
      new Date(sessionData.expiry).toLocaleString(),
    );
  }

  /**
   * Get session data from window memory if not expired
   * @returns {Object|null} Session data or null if expired/not found
   */
  function getSessionData() {
    if (!sessionData) {
      logDebug("No stored session data found");
      return null;
    }

    const now = Date.now();

    if (now > sessionData.expiry) {
      logDebug(
        "Stored session data expired at:",
        new Date(sessionData.expiry).toLocaleString(),
      );
      return null;
    }

    logDebug(
      "Retrieved valid session data, expires in:",
      Math.round((sessionData.expiry - now) / 1000 / 60),
      "minutes",
    );
    return sessionData.data;
  }

  /**
   * Clear stored session data
   */
  function clearSessionData() {
    sessionData = null;
    logDebug("Session data cleared");
  }

  /**
   * Set up interception of Novu session API calls
   */
  function setupTokenInterception() {
    // Intercept fetch calls
    const originalFetch = window.fetch;
    window.fetch = function (url, options) {
      // Check if this is the Novu session API call
      if (
        typeof url === "string" &&
        url.includes("api.novu.co/v1/inbox/session")
      ) {
        // Try to get cached data first
        const cachedData = getSessionData();
        if (cachedData) {
          logDebug(
            "Returning cached session data instead of making API call",
          );

          // Create a Response object with the cached data
          return Promise.resolve(
            new Response(JSON.stringify(cachedData), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
          );
        }

        // No valid cached data, proceed with the original request
        logDebug("No valid cached data, proceeding with API call");

        // Capture request payload for logging
        let requestPayload = null;
        if (options?.body) {
          try {
            requestPayload = JSON.parse(options.body);
            logDebug("Request payload:", requestPayload);
          } catch (err) {
            console.error("Error parsing request payload:", err);
          }
        }

        // Make the original request
        const promise = originalFetch.apply(this, arguments);

        // Process the response
        promise
          .then((response) => {
            // Only process successful responses
            if (response.ok) {
              // Clone the response so we can read it without consuming it
              const clone = response.clone();
              clone
                .json()
                .then((data) => {
                  // Store the response data
                  storeSessionData(data);
                })
                .catch((err) => {
                  console.error(
                    "Error parsing Novu session response:",
                    err,
                  );
                });
            }
          })
          .catch((err) => {
            console.error("Error intercepting Novu session:", err);
          });

        return promise;
      }

      // Not a Novu session API call, proceed normally
      return originalFetch.apply(this, arguments);
    };
  }

  // Expose the API
  window.NovuSessionInterceptor = {
    initialize: initialize,
    getSessionData: getSessionData,
    clearSessionData: clearSessionData,
    getRemainingTTL: () => {
      if (!sessionData) return 0;

      const now = Date.now();
      return Math.max(0, sessionData.expiry - now);
    },
  };
})();
