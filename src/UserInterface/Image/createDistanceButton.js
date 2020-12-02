import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

//import distanceIcon from '../icons/length-tool.svg'
import { reaction, action } from 'mobx'
import vtkDistanceWidget from 'vtk.js/Sources/Interaction/Widgets/DistanceWidget'
import vtkDistanceRepresentation from 'vtk.js/Sources/Interaction/Widgets/DistanceRepresentation'
import * as vtkMath from 'vtk.js/Sources/Common/Core/Math'

function createDistanceButton(store, uiContainer) {
  store.imageUI.distanceWidget = vtkDistanceWidget.newInstance()
  store.imageUI.distanceWidget.setInteractor(store.itkVtkView.getInteractor())

  const distanceRep = vtkDistanceRepresentation.newInstance()
  store.imageUI.distanceWidget.setWidgetRep(distanceRep)

  // Need three decimal places, not two
  distanceRep.setNumberOfDecimals(3)
  distanceRep.getLineProperty().setColor(1, 1, 1)
  distanceRep.getEndPointProperty().setColor(1, 1, 1)
  distanceRep.getEndPoint2Property().setColor(1, 1, 1)
  store.imageUI.distanceWidget.setEnabled(false)

  store.imageUI.distanceUpdateInProgress = false
  store.imageUI.distanceEnabled = false
  const toggleLength = () => {
    store.imageUI.distanceEnabled = !store.imageUI.distanceEnabled
    if (store.imageUI.distanceWidget.getEnabled() !== true) {
      store.imageUI.distanceWidget.setEnabled(true)
      store.imageUI.distanceWidget.onInteractionEvent(() => {
        store.imageUI.distancePoint1 = distanceRep.getPoint1WorldPosition()
        store.imageUI.distancePoint2 = distanceRep.getPoint2WorldPosition()
      })
    }

    if (store.imageUI.distanceEnabled) {
      store.imageUI.distanceWidget.setWidgetStateToStart()
    } else {
      store.imageUI.distanceWidget.setEnabled(false)
    }
    store.renderWindow.render()
  }

  const distanceEntry = document.createElement('div')
  distanceEntry.setAttribute('class', style.distanceEntry)

  const distanceButton = document.createElement('span')
  distanceButton.innerHTML = `<input id="${store.id}-toggleDistanceButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Length" class="${style.distanceButton} ${style.toggleButton}" for="${store.id}-toggleDistanceButton">${distanceIcon}</label>`
  store.imageUI.distanceButtonInput = distanceButton.children[0]
  store.imageUI.distanceButtonInput.checked = store.imageUI.distanceEnabled
  const distanceButtonLabel = distanceButton.children[1]
  applyContrastSensitiveStyle(store, 'invertibleButton', distanceButtonLabel)

  distanceButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    toggleLength()
  })

  // Disable if in volume mode
  reaction(
    () => {
      return store.mainUI.viewMode
    },
    viewMode => {
      store.imageUI.distanceWidget.setEnabled(false)
      store.imageUI.distanceEnabled = false
      store.renderWindow.render()
    }
  )

  distanceEntry.appendChild(distanceButton)

  const distanceLabel = document.createElement('label')
  distanceLabel.setAttribute('class', `${style.distanceLabelCommon}`)
  applyContrastSensitiveStyle(store, 'distanceLabel', distanceLabel)
  distanceLabel.setAttribute('for', `${store.id}-distanceValue`)
  distanceLabel.id = `${store.id}-distanceLabel`
  distanceLabel.innerText = 'Length:'
  distanceEntry.appendChild(distanceLabel)

  const distanceValue = document.createElement('input')
  distanceValue.type = 'text'
  distanceValue.setAttribute('class', style.distanceInput)
  distanceValue.id = `${store.id}-distanceValue`
  distanceValue.setAttribute('name', 'length')
  distanceValue.setAttribute('value', '0')
  distanceValue.setAttribute('disabled', true)
  distanceEntry.appendChild(distanceValue)

  uiContainer.appendChild(distanceEntry)

  // Update the value field when distance is updated
  reaction(
    () => {
      return store.imageUI.distancePoint1
    },
    () => {
      let p1Position = store.imageUI.distancePoint1
      let p2Position = store.imageUI.distancePoint2
      let delta = Math.sqrt(
        vtkMath.distance2BetweenPoints(p1Position, p2Position)
      ).toFixed(3)
      distanceValue.setAttribute('value', `${delta}`)
    }
  )
}

export default createDistanceButton
