import React, { useContext, useState } from 'react'
import { CalendarDay, CaretUp } from 'react-bootstrap-icons'
import { TodoContext } from '../context'
import {calendarItems} from '../constant'
import {useSpring, animated} from 'react-spring'

const Calendar = () => {
  // const calendarItems = ["Today", "Next 7 days", "All days"]
  const [showMenu, setShowMenu] = useState(true)
  const animationSpin = useSpring({
        transform: showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        config: {friction: 10}
  })
  const animationMenu = useSpring({
    display: showMenu ? 'block' : 'none',
    lineHeight: showMenu ? 1.2 : 0

  })
  const {setSelectedProject} = useContext(TodoContext);
  return (
    <div className='calendar'>
      <div className="calendar-top">
        <div className="calendar-title">
          <CalendarDay size={18}/>
          <p>Calendar</p>
        </div>
        <animated.div  style= {animationSpin} className='calendar-btn'
          onClick={() => setShowMenu(!showMenu)}
        >

          <span><CaretUp size={20}/></span>
        </animated.div>
      </div>
      <animated.ul style={animationMenu} className="calendar-content">
        {calendarItems.map(calendarItem => (
          <li className="calendar-item" key={calendarItem}
            onClick={() => setSelectedProject(calendarItem)}
          >
            {calendarItem}
          </li>
        ))}
      </animated.ul>
    </div>
  )
}

export default Calendar