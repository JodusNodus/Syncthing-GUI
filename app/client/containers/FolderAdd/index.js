import { PropTypes, Component } from 'react'
import h from 'react-hyperscript'
import { connect } from 'react-redux'

import FolderEdit from 'client/containers/FolderEdit'
import Header from 'client/components/Header'

import { clearFolderRejected } from 'main/actions/folder-rejected'

const mapStateToProps = state => ({
  myID: state.myID,
  folderRejected: state.folderRejected,
})

@connect(
  mapStateToProps,
  {clearFolderRejected},
  undefined,
  {withRef: true},
)
export default class FolderAdd extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    myID: PropTypes.string.isRequired,
    folderRejected: PropTypes.object.isRequired,
    clearFolderRejected: PropTypes.func.isRequired,
  }

  componentWillUnmount(){
    if(this.props.folderRejected.accepted){
      this.props.clearFolderRejected()
    }
  }
  render(){
    const {
      onSubmit,
      myID,
      folderRejected: {
        accepted,
        folder,
        device,
        folderLabel,
      },
    } = this.props

    const initialDevices = [
      {deviceID: myID},
    ]
    const initialValues = {
      id: accepted ? folder : '',
      label: accepted ? folderLabel : '',
      rescanIntervalS: 60,
      ignorePerms: false,
      order: 'random',
      path: '',
      type: 'readwrite',
      fileVersioningSelector: 'none',
      minDiskFreePct: 1,
      autoNormalize: true,
      devices: accepted ? [
        ...initialDevices,
        {deviceID: device},
      ] : initialDevices,
      maxConflicts: 10,
      simpleKeep: 5,
      staggeredCleanInterval: 3600,
      staggeredMaxAge: 365,
      staggeredVersionsPath: '',
      trashcanClean: 0,
    }

    return h('div.padded-more', [
      h(Header, [
        h('h2', 'Add Folder'),
      ]),
      h('hr'),
      h(FolderEdit, {ref: 'form', initialValues, onSubmit}),
    ])
  }
}
