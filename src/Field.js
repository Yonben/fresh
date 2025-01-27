import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Select from './fields/Select'
import Password from './fields/Password'
import Tags from './fields/Tags'
import TextArea from './fields/TextArea'
import Markdown from './fields/Markdown'
import Toggle from './fields/Toggle'
import { FormContext } from './state/State'

const COMPLEX_FIELDS = { select: Select, password: Password, tags: Tags, markdown: Markdown, textarea: TextArea, toggle: Toggle }

const Field = ({
  required,
  children,
  type,
  label,
  error,
  options,
  className,
  ...rest
}) => {
  const { formState, update } = useContext(FormContext)
  return (
    <div className={`field-wrapper ${className}`}>
      <label htmlFor={`fresh-${children}`}>

        <span>
          {label && children} {required && '*'}
        </span>
        {Object.keys(COMPLEX_FIELDS).includes(type) ? (
          COMPLEX_FIELDS[type]({ options, children, className, type, ...rest })
        ) : (
          <input
            required={required}
            className={className}
            id={`fresh-${children}`}
            type={type}
            value={formState[children]?.value || null}
            onChange={e => update({ id: children, value: e.target.value })}
            {...rest}
          />
        )}
      </label>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

Field.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  label: PropTypes.bool
}

Field.defaultProps = {
  children: '',
  className: '',
  type: 'text',
  options: [],
  required: false,
  label: true
}

export default Field
// MEGA IDEA EFFORTLESS FORMS

// A field should be able to be used just by exporting the context
// This would allow for an api that looks like... <Field />Name {name} useContext
