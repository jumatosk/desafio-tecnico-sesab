import Swal from 'sweetalert2/dist/sweetalert2'

export default {
  message(titulo = '', texto, tipoIcone = 'success', color = '#0471b5') {
    Swal.fire({
      position: 'center',
      icon: tipoIcone,
      title: titulo,
      text: texto,
      showConfirmButton: true,
      confirmButtonColor: color,
      confirmButtonText: `<div style="color: white !important;">Ok</div>`,
      reverseButtons: true,
    })
  },
  messageToast(titulo = '', tipoIcone = 'success', position = 'top-end', timer = 6000) {
    Swal.fire({
      toast: true,
      title: titulo,
      icon: tipoIcone,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
  },

  messageComBtnsDeConfimacao(
    title,
    text = '',
    icon = 'success',
    confirmButtonText = 'Sim',
    cancelButtonText = 'Não',
    denyButtonText = '',
    showDenyButton = false,
  ) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      showDenyButton: showDenyButton,
      confirmButtonColor: '#0471b5',
      denyButtonColor: 'gray',
      confirmButtonText: `<div style="color: white !important;">${confirmButtonText}</div>`,
      cancelButtonText: `<div style="color: white !important;">${cancelButtonText}</div>`,
      denyButtonText: denyButtonText,
      reverseButtons: true,
    })
  },

  deleteMessage(
    title = 'Tem certeza que deseja apagar',
    nameToExclude,
    text = 'Esta ação não poderá ser desfeita!',
  ) {
    return Swal.fire({
      title: `${title}<b>${`${nameToExclude ? ' ' + nameToExclude : ''}`}</b>?`,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: `<div style="color: white !important;">Sim</div>`,
      cancelButtonText: `<div style="color: white !important;">Não</div>`,
      reverseButtons: true,
    })
  },

  warningToUser(title, text, confirmButtonText, cancelButtonText, showCancelButton = true) {
    return Swal.fire({
      title,
      text,
      showCancelButton: showCancelButton,
      showConfirmButton: true,
      icon: 'warning',
      confirmButtonColor: '#0471B5',
      cancelButtonColor: 'gray',
      confirmButtonText: `<div style="color: white !important;">${confirmButtonText}</div>`,
      cancelButtonText: `<div style="color: white !important;">${cancelButtonText}</div>`,
      reverseButtons: true,
    })
  },
}
