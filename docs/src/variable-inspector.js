import React from 'react'
// import PropTypes from 'prop-types'
import chroma from 'chroma-js'
import {BorderBox, Box, Flex, Link, Text} from '@primer/components'

export default function VariableInspector({variables, ...rest}) {
  const keys = Object.keys(variables).sort()
  return keys.map(name => {
    const {computed, values, refs} = variables[name]
    return (
      <BorderBox id={idForName(name)} p={2} mb={2} as={Flex} flexWrap="wrap" alignItems="center">
        <Swatch color={computed} />
        <Text px={2} fontFamily="mono">
          <b>{name}</b>:
        </Text>
        <Box>{join(values.reverse().map(value => <Ref value={value} variables={variables} />), <LeftArrow />)}</Box>
        <Box pl={3}>
          {refs.length ? (
            <>
              <Text color="gray.5">Aliases:</Text>{' '}
              {join(refs.map(ref => <Ref value={ref} variables={variables} />), ', ')}
            </>
          ) : null}
        </Box>
      </BorderBox>
    )
  })
}

function Swatch({color, size = 16, ...rest}) {
  const style = {width: size, height: size}
  if (color && /^(#|rgb|hsl)/.test(color)) {
    try {
      style.backgroundColor = chroma(color).css()
    } catch (error) {
      console.warn(`Not a color: "${color}"`)
    }
  } else {
    style.borderColor = 'transparent'
  }
  return <BorderBox style={style} display="inline-block" mr={2} />
}

function Ref({value, variables, children = value, ...rest}) {
  const content = variables[value] ? (
    <Link href={`#${idForName(value)}`} {...rest}>
      {children}
    </Link>
  ) : (
    <Text color="gray.7">{children}</Text>
  )
  return <Text fontFamily="mono">{content}</Text>
}

function join(elements, glue) {
  const last = elements.length - 1
  return elements.map((el, i) =>
    i === last ? (
      el
    ) : (
      <>
        {el}
        {glue}
      </>
    )
  )
}

function LeftArrow() {
  return (
    <Text color="gray.3" px={2}>
     ←
    </Text>
  )
}

function idForName(name) {
  return name.replace(/^\$/, '')
}

function Cell({as = 'td', style, ...rest}) {
  return <BorderBox as={as} p={2} style={Object.assign({textAlign: 'left', verticalAlign: 'top'}, style)} {...rest} />
}
