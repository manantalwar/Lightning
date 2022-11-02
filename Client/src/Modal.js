import React from 'react'
import { HeatMap, ScatterPlot, Histogram} from './Graphs';
import LineChart from './Graphs';

const MODAL_STYLES = {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 1000,
    width: '40%',
    height: '10%'
  }

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
  }

export default function Modal({ open, children, onClose }) {
    if (!open) return null
    console.log(children)
    return(
      <>
      <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <button onClick={onClose}>Close</button>
          {children}
        </div>
      </>
    )
  }