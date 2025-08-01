import { WebTracerProvider } from '@opentelemetry/web';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

// Create resource
const resource = resourceFromAttributes({
  [SemanticResourceAttributes.SERVICE_NAME]: 'observacart-frontend',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: 'frontend-instance-1',
});

// Create OTLP exporter for sending traces
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // OpenTelemetry Collector HTTP endpoint
});

// Create tracer provider
const provider = new WebTracerProvider({
  resource: resource,
});

// Add batch span processor
provider.addSpanProcessor(new BatchSpanProcessor(traceExporter));

// Register the provider
provider.register();

// Register instrumentations
registerInstrumentations({
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

console.log('🔍 OpenTelemetry started successfully - ObservaCart Frontend instrumented!');

export default provider;
