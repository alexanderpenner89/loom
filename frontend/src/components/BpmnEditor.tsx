// frontend/src/components/BpmnEditor.tsx
import React, { useEffect, useRef, useImperativeHandle } from 'react'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import BpmnViewer from 'bpmn-js/lib/Viewer'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'

export interface BpmnEditorProps {
  xml: string
  readOnly?: boolean
  onXmlChange?: (xml: string) => void
  className?: string
}

export interface BpmnEditorHandle {
  undo: () => void
  redo: () => void
  zoomFit: () => void
  flush: () => Promise<void>
}

const BpmnEditor = React.forwardRef<BpmnEditorHandle, BpmnEditorProps>(
  function BpmnEditor({ xml, readOnly = false, onXmlChange, className }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const instanceRef = useRef<BpmnModeler | BpmnViewer | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const onXmlChangeRef = useRef(onXmlChange)

    // Keep callback ref current without re-triggering effects
    useEffect(() => {
      onXmlChangeRef.current = onXmlChange
    })

    async function saveAndNotify(instance: BpmnModeler | BpmnViewer) {
      try {
        const { xml: savedXml, warnings } = await (instance as BpmnModeler).saveXML({ format: true })
        if (warnings?.length) console.warn('BpmnEditor: saveXML warnings', warnings)
        onXmlChangeRef.current?.(savedXml)
      } catch (e) {
        console.error('BpmnEditor: saveXML failed', e)
      }
    }

    async function flushPendingSave() {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
        if (instanceRef.current) {
          await saveAndNotify(instanceRef.current)
        }
      }
    }

    useImperativeHandle(ref, () => ({
      undo() {
        const cs = (instanceRef.current as BpmnModeler)?.get?.('commandStack') as any
        cs?.undo?.()
      },
      redo() {
        const cs = (instanceRef.current as BpmnModeler)?.get?.('commandStack') as any
        cs?.redo?.()
      },
      zoomFit() {
        const canvas = instanceRef.current?.get?.('canvas') as any
        canvas?.zoom?.('fit-viewport', 'auto')
      },
      flush: flushPendingSave,
    }))

    useEffect(() => {
      if (!containerRef.current) return

      const instance = readOnly
        ? new BpmnViewer({ container: containerRef.current })
        : new BpmnModeler({ container: containerRef.current })

      instanceRef.current = instance

      instance.importXML(xml).then(({ warnings }) => {
        if (warnings?.length) console.warn('BpmnEditor: import warnings', warnings)
        const canvas = instance.get('canvas') as any
        canvas.zoom('fit-viewport', 'auto')
      }).catch((err: Error) => {
        console.error('BpmnEditor: import failed', err)
      })

      if (!readOnly) {
        const eventBus = (instance as BpmnModeler).get('eventBus') as any
        eventBus.on('commandStack.changed', () => {
          if (debounceRef.current) clearTimeout(debounceRef.current)
          debounceRef.current = setTimeout(() => {
            debounceRef.current = null
            saveAndNotify(instance)
          }, 300)
        })
      }

      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
          debounceRef.current = null
        }
        instance.destroy()
        instanceRef.current = null
      }
      // key-based re-mount handles readOnly changes; xml prop changes are intentionally ignored after mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div
        ref={containerRef}
        className={className}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }
)

export default BpmnEditor
