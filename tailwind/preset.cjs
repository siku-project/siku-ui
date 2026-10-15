// SIKU — preset Tailwind v3, generated from tokens.json (v4). Ne pas modifier.
/** @type {import('tailwindcss').Config} */
module.exports = {
  "theme": {
    "colors": {
      "transparent": "transparent",
      "current": "currentColor",
      "inherit": "inherit",
      "bg-void": "var(--bg-void)",
      "bg-base": "var(--bg-base)",
      "bg-raised": "var(--bg-raised)",
      "bg-sunken": "var(--bg-sunken)",
      "bg-control": "var(--bg-control)",
      "bg-control-hover": "var(--bg-control-hover)",
      "bg-control-active": "var(--bg-control-active)",
      "bg-inverse": "var(--bg-inverse)",
      "bg-inverse-hover": "var(--bg-inverse-hover)",
      "bg-inverse-active": "var(--bg-inverse-active)",
      "fg-primary": "var(--fg-primary)",
      "fg-secondary": "var(--fg-secondary)",
      "fg-tertiary": "var(--fg-tertiary)",
      "fg-disabled": "var(--fg-disabled)",
      "fg-inverse": "var(--fg-inverse)",
      "border-subtle": "var(--border-subtle)",
      "border-default": "var(--border-default)",
      "border-strong": "var(--border-strong)",
      "track": "var(--track)",
      "focus-ring": "var(--focus-ring)",
      "selection": "var(--selection)",
      "accent": "var(--accent)",
      "accent-subtle": "var(--accent-subtle)",
      "success": "var(--success)",
      "success-subtle": "var(--success-subtle)",
      "danger": "var(--danger)",
      "danger-subtle": "var(--danger-subtle)",
      "warning": "var(--warning)",
      "warning-subtle": "var(--warning-subtle)",
      "container-foreign": "var(--container-foreign)",
      "container-foreign-border": "var(--container-foreign-border)",
      "status-health": "var(--status-health)",
      "status-armor": "var(--status-armor)",
      "status-need": "var(--status-need)",
      "status-critical": "var(--status-critical)",
      "scrim": "var(--scrim)",
      "button-primary-bg": "var(--button-primary-bg)",
      "button-primary-fg": "var(--button-primary-fg)",
      "button-secondary-bg": "var(--button-secondary-bg)",
      "slot-bg": "var(--slot-bg)",
      "slot-bg-empty": "var(--slot-bg-empty)",
      "slot-ring-selected": "var(--slot-ring-selected)",
      "chart-1": "var(--chart-1)",
      "chart-2": "var(--chart-2)",
      "chart-3": "var(--chart-3)",
      "chart-4": "var(--chart-4)",
      "chart-5": "var(--chart-5)",
      "chart-6": "var(--chart-6)",
      "gauge-fill": "var(--gauge-fill)",
      "gauge-track": "var(--gauge-track)",
      "hold-progress": "var(--hold-progress)",
      "slot-drop": "var(--slot-drop)",
      "plate-fg": "var(--plate-fg)",
      "plate-border": "var(--plate-border)"
    },
    "spacing": {
      "0": "0",
      "1": "var(--space-1)",
      "2": "var(--space-2)",
      "3": "var(--space-3)",
      "4": "var(--space-4)",
      "5": "var(--space-5)",
      "6": "var(--space-6)",
      "8": "var(--space-8)",
      "10": "var(--space-10)",
      "12": "var(--space-12)",
      "16": "var(--space-16)",
      "24": "var(--space-24)",
      "px": "1px",
      "0.5": "var(--space-0-5)"
    },
    "borderRadius": {
      "none": "0",
      "xs": "var(--radius-xs)",
      "sm": "var(--radius-sm)",
      "md": "var(--radius-md)",
      "lg": "var(--radius-lg)",
      "xl": "var(--radius-xl)",
      "full": "var(--radius-full)"
    },
    "fontFamily": {
      "sans": "var(--font-sans)",
      "mono": "var(--font-mono)"
    },
    "boxShadow": {
      "none": "none",
      "float": "var(--shadow-float)",
      "overlay": "var(--shadow-overlay)",
      "text": "var(--shadow-text)"
    },
    "transitionDuration": {
      "instant": "var(--duration-instant)",
      "fast": "var(--duration-fast)",
      "base": "var(--duration-base)",
      "slow": "var(--duration-slow)",
      "hold": "var(--duration-hold)"
    },
    "transitionTimingFunction": {
      "standard": "var(--ease-standard)",
      "exit": "var(--ease-exit)",
      "linear": "var(--ease-linear)"
    },
    "zIndex": {
      "0": "0",
      "hud": "var(--z-hud)",
      "panel": "var(--z-panel)",
      "overlay": "var(--z-overlay)",
      "toast": "var(--z-toast)",
      "tooltip": "var(--z-tooltip)"
    },
    "extend": {
      "height": {
        "control-sm": "var(--control-sm)",
        "control-md": "var(--control-md)",
        "control-lg": "var(--control-lg)",
        "control-touch": "var(--control-touch)",
        "slot-sm": "var(--slot-sm)",
        "slot-md": "var(--slot-md)"
      },
      "width": {
        "slot-sm": "var(--slot-sm)",
        "slot-md": "var(--slot-md)"
      },
      "opacity": {
        "scrim-light": "var(--opacity-scrim-light)",
        "scrim": "var(--opacity-scrim)",
        "scrim-heavy": "var(--opacity-scrim-heavy)",
        "disabled": "var(--opacity-disabled)"
      },
      "fontSize": {}
    }
  }
};
module.exports.theme.extend.fontSize = {
  "figure-xl": [
    "5rem",
    {
      "lineHeight": "4rem",
      "fontWeight": "500",
      "letterSpacing": "-0.04em"
    }
  ],
  "figure": [
    "3.5rem",
    {
      "lineHeight": "3.5rem",
      "fontWeight": "600",
      "letterSpacing": "-0.03em"
    }
  ],
  "figure-sm": [
    "max(var(--text-floor-3xl), 1.75rem)",
    {
      "lineHeight": "2rem",
      "fontWeight": "600",
      "letterSpacing": "-0.02em"
    }
  ],
  "display": [
    "max(var(--text-floor-4xl), 3.25rem)",
    {
      "lineHeight": "3.5rem",
      "fontWeight": "600",
      "letterSpacing": "-0.035em"
    }
  ],
  "title-lg": [
    "max(var(--text-floor-3xl), 1.75rem)",
    {
      "lineHeight": "2.25rem",
      "fontWeight": "600",
      "letterSpacing": "-0.02em"
    }
  ],
  "title": [
    "max(var(--text-floor-2xl), 1.5rem)",
    {
      "lineHeight": "1.875rem",
      "fontWeight": "600",
      "letterSpacing": "-0.015em"
    }
  ],
  "heading": [
    "max(var(--text-floor-xl), 1.1875rem)",
    {
      "lineHeight": "1.5rem",
      "fontWeight": "600",
      "letterSpacing": "-0.005em"
    }
  ],
  "subheading": [
    "max(var(--text-floor-lg), 1rem)",
    {
      "lineHeight": "1.375rem",
      "fontWeight": "600"
    }
  ],
  "body": [
    "max(var(--text-floor-md), 0.9375rem)",
    {
      "lineHeight": "1.375rem",
      "fontWeight": "400"
    }
  ],
  "body-sm": [
    "max(var(--text-floor-md), 0.875rem)",
    {
      "lineHeight": "1.25rem",
      "fontWeight": "400"
    }
  ],
  "caption": [
    "max(var(--text-floor-sm), 0.8125rem)",
    {
      "lineHeight": "1.125rem",
      "fontWeight": "500"
    }
  ],
  "key": [
    "max(var(--text-floor-xs), 0.6875rem)",
    {
      "lineHeight": "0.875rem",
      "fontWeight": "600"
    }
  ],
  "code": [
    "max(var(--text-floor-sm), 0.8125rem)",
    {
      "lineHeight": "1.125rem",
      "fontWeight": "500",
      "letterSpacing": "0.02em"
    }
  ]
};
