import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  name: "novusys wallet",
  description: "A wallet that grows with you.",
  version: "0.0.1",
  manifest_version: 3,
  icons: {
    "16": "icons/favicon-16x16.png",
    "32": "icons/favicon-32x32.png",
    "48": "icons/favicon-48x48.png",
    "64": "icons/favicon-64x64.png",
    "128": "icons/favicon-128x128.png",
  },
  action: {
    default_popup: "popup.html",
    default_icon: "icons/favicon-64x64.png",
  },
  background: {
    service_worker: "src/scripts/background.js",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/scripts/content.js"],
      all_frames: true,
    },
  ],
  permissions: ["identity", "storage", "tabs"],
});
