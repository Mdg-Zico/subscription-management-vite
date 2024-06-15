import React from 'react'

function layout() {
  return (
    <div>
       <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
    </div>
  )
}

export default layout
