export function imageUpdating({ actorContext: { spinner } }) {
  spinner.style.visibility = 'visible'
}

export function idle({ actorContext: { spinner } }) {
  spinner.style.visibility = 'hidden'
}
