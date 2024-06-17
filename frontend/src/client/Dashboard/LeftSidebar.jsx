import React from 'react'
import {ClientLinks} from  '../../components/SideBareLinks'
import SideBare from '../../components/SideBare'
function LeftSidebar() {
  return (
  <SideBare  arrayLinksFromsidebare={ClientLinks} />
  )
}

export default LeftSidebar
