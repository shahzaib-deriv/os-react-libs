// src/novu.jsx
import ReactDOM from 'react-dom/client';
import { Inbox } from '@novu/react';
import BellIcon from './components/BellIcon';

// Export Inbox component to the window object
if (typeof window !== 'undefined') {
  window.NovuReact = {
    Inbox
  };
}

// Store React roots to avoid creating multiple roots for the same container
const rootRegistry = new Map();

// Default appearance configuration for the Inbox component
const defaultAppearance = {
  icons: {
    bell: () => <BellIcon />
  },
  variables: {
    borderRadius: "8px",
    fontSize: "16px",
    colorShadow: "rgba(0, 0, 0, 0.1)",
    colorNeutral: "#1A1523",
    colorCounterForeground: "#ffffff",
    colorCounter: "#FF444F",
    colorSecondaryForeground: "#1A1523",
    colorPrimaryForeground: "#ffffff",
    colorPrimary: "#FF444F",
    colorForeground: "#181C25",
    colorBackground: "#ffffff",
  },
  elements: {
    popoverTrigger: {
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    bellContainer: {
      width: "24px",
      height: "24px",
    },
    bellIcon: {
      width: "24px",
      height: "24px",
    },
    preferences__button: { display: "none" },
    popoverContent: "novu-popover-content",
  },
};

// Default styles configuration for the Inbox component
const defaultStyles = {
  bell: { root: { background: "transparent", color: "black" } },
  popover: { root: { zIndex: 100 } },
};

// Default i18n configuration for the Inbox component
const defaultI18n = {
  poweredBy: "Notifications by",
};

// Default localization configuration for the Inbox component
const defaultLocalization = {
  "inbox.filters.labels.default": "Notifications"
};


// Export a helper function to render the Inbox component directly without NovuProvider
export function renderInbox(container, props = {}) {
  if (container) {
    const {
      appearance: userAppearance = {},
      styles = defaultStyles,
      colorScheme = "light",
      i18n = defaultI18n,
      placement = "bottom-end",
      localization = defaultLocalization,
      ...otherProps
    } = props;

    // Create a new appearance object that merges the user's appearance with the default
    // but always uses our built-in bell icon
    const appearance = {
      ...defaultAppearance,
      ...userAppearance,
      icons: {
        ...defaultAppearance.icons,
        ...(userAppearance.icons || {}),
        // Always override the bell icon with our React component
        bell: () => <BellIcon />
      }
    };

    // Get existing root or create a new one
    let root;
    if (rootRegistry.has(container)) {
      root = rootRegistry.get(container);
    } else {
      root = ReactDOM.createRoot(container);
      rootRegistry.set(container, root);
    }
    
    // Always render just the Inbox component without NovuProvider
    root.render(
      <Inbox 
        appearance={appearance}
        styles={styles}
        colorScheme={colorScheme}
        i18n={i18n}
        placement={placement}
        localization={localization}
        {...otherProps} 
      />
    );
  }
}

// Helper function to clear an inbox container
export function clearInbox(container) {
  if (container) {
    if (rootRegistry.has(container)) {
      const root = rootRegistry.get(container);
      root.unmount();
      rootRegistry.delete(container);
    }
    container.innerHTML = '';
  }
}
