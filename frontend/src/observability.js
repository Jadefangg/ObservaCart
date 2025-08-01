import { WebSDK } from '@opentelemetry/web';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';

// Create OTLP exporter for sending traces
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // OpenTelemetry Collector HTTP endpoint
});

// Initialize the Web SDK
const sdk = new WebSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'observacart-frontend',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: 'frontend-instance-1',
  }),
  traceExporter,
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [
        /^https?:\/\/localhost/,
      ],
    }),
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: [
        /^https?:\/\/localhost/,
      ],
    }),
  ],
});

// Start the SDK
sdk.start()
  .then(() => console.log('🔍 OpenTelemetry started successfully - ObservaCart Frontend instrumented!'))
  .catch((error) => console.log('❌ Error initializing OpenTelemetry', error));

export default sdk;
