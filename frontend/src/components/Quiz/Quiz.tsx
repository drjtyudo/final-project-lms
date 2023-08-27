import React, { useState, useEffect } from 'react'

const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(600) // 600 detik (10 menit)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(timerInterval)
    }
  }, [timeLeft])

  const quizData = [
    {
      no: '3',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['react', 'Flutter', 'Opsi C'],
    },
    {
      no: '3',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['Opsi A', 'Opsi B', 'Opsi C'],
    },
    {
      no: '3',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['Opsi A', 'Opsi B', 'Opsi C'],
    },
    {
      no: '4',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['Opsi A', 'Opsi B', 'Opsi C'],
    },
    {
      no: '5',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['Opsi A', 'Opsi B', 'Opsi C'],
    },
    {
      no: '6',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['Opsi A', 'Opsi B', 'Opsi C'],
    },
    {
      no: '7',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['Opsi A', 'Opsi B', 'Opsi C'],
    },
    {
      no: '8',
      question:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum enim quis ligula laoreet convallis. Fusce sodales ligula ',
      options: ['Opsi A', 'Opsi B', 'Opsi C'],
    },
  ]

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex)
    setTimeout(() => {
      setSelectedOption(null)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }, 1000)
  }

  return (
    <div className="flex w-[1254px] px-[110px] m-auto h-[350px]">
      <div className="flex-grow p-4">
        {currentQuestionIndex < quizData.length && (
          <div className="mb-14">
            <p className="w-[483px]">{quizData[currentQuestionIndex].question}</p>
            <div className="flex gap-6 flex-row justify-center mt-36 absolute ml-[15px]">
              {quizData[currentQuestionIndex].options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex w-[300px] items-center py-2 px-4  mr-4 rounded bg-gray-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={selectedOption === optionIndex}
                    onChange={() => handleOptionSelect(optionIndex)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="kotak-grid w-1/4 p-4">
      <div className="mb-4">
          <p>
            Sisa Waktu: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? '0' : ''}
            {timeLeft % 60}
          </p>
        </div>  
        <div className="grid grid-cols-4 gap-2">
          {quizData.map((item, index) => (
            <div
              key={index}
              className={`bg-gray-300 h-10 ${
                index === currentQuestionIndex ? 'bg-blue-200' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {item.no}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quiz
