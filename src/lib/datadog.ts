import { datadogRum } from "@datadog/browser-rum";
import { env } from "@/env/client.mjs";

datadogRum.init({
  applicationId: env.NEXT_PUBLIC_DD_APPLICATION_ID,
  clientToken: env.NEXT_PUBLIC_DD_CLIENT_TOKEN,
  site: "datadoghq.eu",
  service: "uav",
  env: env.NEXT_PUBLIC_DD_ENV,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
});

datadogRum.startSessionReplayRecording();
