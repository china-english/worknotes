/**
 * Created by zhaoyu on Jun 29, 2017.
 */
import React, { Component } from 'react'
import Button from 'antd/lib/button'
import './Home.css'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <div className='lander'>
          <h1>Scratch</h1>
          <Button type="primary">Button</Button>
          <p>A simple note taking app</p>
        </div>
      </div>
    )
  }
}

export default Home
