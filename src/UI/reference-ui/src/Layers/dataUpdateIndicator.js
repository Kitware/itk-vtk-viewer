export function startDataUpdate({ actorContext: { spinner } }) {
  spinner.style.visibility = 'visible'
}

export function finishDataUpdate({ actorContext: { spinner } }) {
  spinner.style.visibility = 'hidden'
}
