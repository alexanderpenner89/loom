declare module 'bpmn-moddle' {
  export class BpmnModdle {
    constructor(options?: Record<string, unknown>);
    fromXML(xml: string): Promise<{ rootElement: any; warnings?: any[] }>;
    toXML(element: any, options?: Record<string, unknown>): Promise<{ xml: string; warnings?: any[] }>;
  }
}
