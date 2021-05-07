import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const listFromStorage = localStorage.getItem('list')
  ? JSON.parse(localStorage.getItem('list'))
  : []

const App = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState(listFromStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  })

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    document.title = `רשימת קניות (${list.length})`
  }, [list.length])

  const showAlert = (show = false, type = '', message = '') => {
    setAlert({ show, type, message })
  }

  const clearItems = () => {
    showAlert(true, 'success', 'הרשימה נמחקה בהצלחה')
    setList([])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'יש להקליד ערך')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'הפריט עודכן בהצלחה')
    } else {
      showAlert(true, 'success', 'המוצר התווסף בהצלחה')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      }
      setList([newItem, ...list])
      setName('')
    }
  }

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id))
    showAlert(true, 'success', 'הפריט הוסר בהצלחה')
  }

  const editItem = (id) => {
    const editedItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(editedItem.title)
  }

  return (
    <>
      <section className='section-center'>
        <h3>רשימת קניות</h3>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <form className='grocery-form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='grocery'
            placeholder='לדוגמה: "ביצים"'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? `ערוך` : `אישור`}
          </button>
        </form>
        {list.length > 0 && (
          <div className='grocery-container'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearItems}>
              נקה פריטים
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default App
