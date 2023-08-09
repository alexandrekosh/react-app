import React, { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [use, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent(){
    const newstudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudents(prevState => [...prevState, newstudent])
  }

  useEffect(() => {
    async function dataFetch() {
      const response = await fetch('https://api.github.com/users/alexandrekosh')
      const data = await response.json()
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    dataFetch()
  }, [])

  return (
    <div className='container'>
      <header>
        <h2>Lista de convidados</h2>
        <div>
          <strong>{use.name}</strong>
          <img src={use.avatar} alt="foto de perfil" />
        </div>
      </header>

      <input 
      type="text" 
      placeholder="Ecreva aqui"
      onChange={e => setStudentName(e.target.value)}
      />

      <button type='button' onClick={handleAddStudent}>
        adicionar
      </button>
        {
          students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          ></Card>
          ))
        }
    </div>
  )
}