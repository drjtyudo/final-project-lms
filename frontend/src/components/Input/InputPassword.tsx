import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input, Form } from 'antd'

interface InputPasswordProps {
  name: string
  placeholder: string
  label: string
  className?: string
  required: boolean
  messages: string
  value?: any
  onChange?: any
}

function InputPassword(props: InputPasswordProps) {
  const {
    name,
    placeholder,
    label,
    className,
    required,
    messages,
    value,
    onChange,
  } = props
  return (
    <div>
      <span>
        <span className="flex mb-3 items-center">
          <span className="text-[#404258] text-[17px]">{label}</span>
          {required && (
            <span className="text-red-500 ml-1 text-[17px] md:text-[12px]">
              *
            </span>
          )}
        </span>
        <Form.Item
          className="mb-6"
          name={name}
          rules={[{ required, message: messages }]}
        >
          <Input.Password
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            // eslint-disable-next-line react/no-unstable-nested-components
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </span>
    </div>
  )
}

export default InputPassword
