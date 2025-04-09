import { TextDecoder, TextEncoder } from 'util';

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
}
