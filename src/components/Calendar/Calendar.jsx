import React, { useState, useEffect } from 'react'
import './calendar.css'

const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']

const GitHubCalendar = () => {
  const [contributions, setContributions] = useState({})

  const fetchData = async () => {
    try {
      const response = await fetch('https://dpg.gg/test/calendar.json') 
      const data = await response.json()
      setContributions(data)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderCalendar = () => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 50 * 7)

    const monthLabels = []
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(startDate)
      monthDate.setMonth(monthDate.getMonth() + i)
      const monthName = getMonthName(monthDate.getMonth())
      monthLabels.push(
        <div key={`month-label-${i}`} className="month-label">
          {monthName}
        </div>
      )
    }

    const calendar = []

    const dayHeaders = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']


    const dayHeaderCells = dayHeaders.map((dayHeader) => (
      <div key={`day-header-${dayHeader}`} className="day-header">
        {dayHeader}
      </div>
    ))

    for (let j = 0; j < 7; j++) {
      const week = []

      week.push(
        <div key={`day-label-week-${j}`} className="day-label">
          {dayHeaders[j]}
        </div>
      )

      for (let i = 0; i < 51; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(currentDate.getDate() + i * 7 + j)

        const dateString = currentDate.toISOString().split('T')[0]
        const contributionData = contributions[dateString] || 0

        const colorIndex = Math.min(Math.floor(contributionData / 10), 4)
        const color = colors[colorIndex]

        const contributionCountClassName = `contrib-${colorIndex}`
        week.push(
          <div
            key={dateString}
            className={`calendar-cell ${contributionCountClassName}`}
            style={{ backgroundColor: color }}
            data-tooltip={`${dateString}: ${contributionData} контрибуций`}
          >
            &nbsp;
          </div>
        )
      }
      calendar.push(
        <div key={`week-${j}`} className="calendar-week">
          {week}
        </div>
      )
    }

    return (
      <div className="github-calendar">
        <div className="github-calendar">
          <div className="month-labels">{monthLabels}</div>
          <div className="calendar">{calendar}</div>
        </div>
      </div>
    )
  }

  const getMonthName = (monthIndex) => {
    const monthNames = [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ]
    return monthNames[monthIndex]
  }

  return <div>{renderCalendar()}</div>
}

export default GitHubCalendar
