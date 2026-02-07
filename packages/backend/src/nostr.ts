import { Relay, relayInit, Event } from 'nostr-tools';

const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band'
];

export class NostrClient {
  private relays: Relay[] = [];
  private relayUrls: string[];

  constructor(relayUrls?: string[]) {
    this.relayUrls = relayUrls || 
      (process.env.NOSTR_RELAYS?.split(',') || DEFAULT_RELAYS);
  }

  async connect(): Promise<void> {
    const connections = this.relayUrls.map(async (url) => {
      try {
        const relay = relayInit(url);
        await relay.connect();
        this.relays.push(relay);
        console.log(`Connected to relay: ${url}`);
      } catch (error) {
        console.error(`Failed to connect to relay ${url}:`, error);
      }
    });

    await Promise.allSettled(connections);
  }

  async publishEvent(event: Event): Promise<void> {
    if (this.relays.length === 0) {
      await this.connect();
    }

    const publishPromises = this.relays.map(async (relay) => {
      try {
        await relay.publish(event);
        console.log(`Published event to ${relay.url}`);
      } catch (error) {
        console.error(`Failed to publish to ${relay.url}:`, error);
      }
    });

    await Promise.allSettled(publishPromises);
  }

  async subscribeToEvents(
    filters: any[],
    onEvent: (event: Event) => void
  ): Promise<() => void> {
    if (this.relays.length === 0) {
      await this.connect();
    }

    const subs = this.relays.map((relay) => {
      const sub = relay.sub(filters);
      sub.on('event', onEvent);
      return sub;
    });

    // Return cleanup function
    return () => {
      subs.forEach(sub => sub.unsub());
    };
  }

  disconnect(): void {
    this.relays.forEach(relay => relay.close());
    this.relays = [];
  }
}

// Helper to create a deed announcement event
export function createDeedEvent(
  deed: { id: string; type: string; description?: string },
  privateKey: string
): Event {
  // This is a stub - in production, properly sign with nostr-tools
  return {
    kind: 30023, // Long-form content kind for deeds
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ['d', deed.id],
      ['t', deed.type],
    ],
    content: deed.description || '',
    pubkey: '', // Would be derived from privateKey
    id: '', // Would be computed
    sig: '' // Would be signed
  };
}
