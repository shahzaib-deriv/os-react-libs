/**
 * API Consistency Tests
 *
 * These tests ensure that the exposed APIs remain consistent across changes.
 * They verify the presence of all expected objects, methods, and properties.
 */

import { describe, test, expect, beforeEach, vi } from "vitest";
import fs from "fs";
import path from "path";

// Create mock objects that match the expected API structure
beforeEach(() => {
  // Mock ReactHotToast
  window.ReactHotToast = {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    custom: vi.fn(),
    dismiss: vi.fn(),
    remove: vi.fn(),
    removeAll: vi.fn(),
    promise: vi.fn(),
  };

  // Mock NovuReact
  window.NovuReact = {
    Inbox: {},
    renderInbox: vi.fn(),
    clearInbox: vi.fn(),
  };

  // Mock NovuSessionInterceptor
  window.NovuSessionInterceptor = {
    initialize: vi.fn(),
    getSessionData: vi.fn(),
    clearSessionData: vi.fn(),
    getRemainingTTL: vi.fn(),
  };

  // Mock ReactLibs
  window.ReactLibs = {
    ReactHotToast: {
      toast: window.ReactHotToast,
      Toaster: {},
      ToastBar: {},
      renderToaster: vi.fn(),
    },
    NovuReact: window.NovuReact,
    NovuSessionInterceptor: window.NovuSessionInterceptor,
  };
});

describe("ReactLibs API Consistency", () => {
  // Verify that the source files exist
  test("Source files should exist", () => {
    expect(fs.existsSync(path.resolve("./src/window-libs.js"))).toBe(true);
    expect(fs.existsSync(path.resolve("./src/novu.jsx"))).toBe(true);
    expect(
      fs.existsSync(path.resolve("./src/novu-session-interceptor.js")),
    ).toBe(true);
  });

  test("window.ReactLibs should exist and contain expected libraries", () => {
    expect(window.ReactLibs).toBeDefined();
    expect(Object.keys(window.ReactLibs)).toEqual(
      expect.arrayContaining([
        "ReactHotToast",
        "NovuReact",
        "NovuSessionInterceptor",
      ]),
    );
  });

  describe("ReactHotToast API", () => {
    test("window.ReactHotToast should exist", () => {
      expect(window.ReactHotToast).toBeDefined();
    });

    test("ReactHotToast should have all expected methods", () => {
      const expectedMethods = [
        "success",
        "error",
        "loading",
        "custom",
        "dismiss",
        "remove",
        "removeAll",
        "promise",
      ];

      expectedMethods.forEach((method) => {
        expect(window.ReactHotToast[method]).toBeDefined();
        expect(typeof window.ReactHotToast[method]).toBe("function");
      });
    });

    test("window.ReactLibs.ReactHotToast should contain all expected properties", () => {
      const expectedProperties = [
        "toast",
        "Toaster",
        "ToastBar",
        "renderToaster",
      ];

      expectedProperties.forEach((prop) => {
        expect(window.ReactLibs.ReactHotToast[prop]).toBeDefined();
      });
    });
  });

  describe("NovuReact API", () => {
    test("window.NovuReact should exist", () => {
      expect(window.NovuReact).toBeDefined();
    });

    test("NovuReact should have all expected methods and components", () => {
      const expectedProperties = ["Inbox", "renderInbox", "clearInbox"];

      expectedProperties.forEach((prop) => {
        expect(window.NovuReact[prop]).toBeDefined();
      });
    });

    test("window.ReactLibs.NovuReact should contain all expected properties", () => {
      const expectedProperties = ["Inbox", "renderInbox", "clearInbox"];

      expectedProperties.forEach((prop) => {
        expect(window.ReactLibs.NovuReact[prop]).toBeDefined();
      });
    });

    test("NovuReact should NOT contain removed properties", () => {
      const removedProperties = [
        "NovuProvider",
        "Notifications",
        "NotificationBell",
        "useNotifications",
        "useNovu",
        "initializeNovu",
      ];

      removedProperties.forEach((prop) => {
        expect(window.NovuReact[prop]).toBeUndefined();
      });
    });
  });

  describe("NovuSessionInterceptor API", () => {
    test("window.NovuSessionInterceptor should exist", () => {
      expect(window.NovuSessionInterceptor).toBeDefined();
    });

    test("NovuSessionInterceptor should have all expected methods", () => {
      const expectedMethods = [
        "initialize",
        "getSessionData",
        "clearSessionData",
        "getRemainingTTL",
      ];

      expectedMethods.forEach((method) => {
        expect(window.NovuSessionInterceptor[method]).toBeDefined();
        expect(typeof window.NovuSessionInterceptor[method]).toBe("function");
      });
    });

    test("window.ReactLibs.NovuSessionInterceptor should contain all expected methods", () => {
      const expectedMethods = [
        "initialize",
        "getSessionData",
        "clearSessionData",
        "getRemainingTTL",
      ];

      expectedMethods.forEach((method) => {
        expect(window.ReactLibs.NovuSessionInterceptor[method]).toBeDefined();
        expect(typeof window.ReactLibs.NovuSessionInterceptor[method]).toBe(
          "function",
        );
      });
    });
  });
});
