import React from 'react'

const NuvocottoJaali = () => {

  return (
    <>
    <model-viewer slot="canvas" style={{ width: '700px', height: '500px',background: '#eeeeee'}} camera-orbit="45deg 55deg 4m" src="/Assests/Nuvocotto/Amber-Jaali.gltf" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="poster.webp" shadow-intensity="1">
        <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
        </div>
    </model-viewer>
        <model-viewer slot="canvas" style={{ width: '700px', height: '500px',background: '#eeeeee'}} camera-orbit="45deg 55deg 4m" src="/Assests/Nuvocotto/Camp.gltf" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="poster.webp" shadow-intensity="1">
        <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
        </div>
    </model-viewer>
    </>
  )
}

export default NuvocottoJaali
