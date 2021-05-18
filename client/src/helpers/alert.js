import Swal from "sweetalert2";

export const AlertResp = (title, text, icon, confirmButtonText) =>{
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      padding: '3em',
      background: '#eee',
      backdrop: `rgba(0,0,123,0.4)`
    });
}