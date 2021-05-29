import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const AlertResp = (title, text, icon, confirmButtonText,preConfirm) =>{
    MySwal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      padding: '3em',
      background: '#eee',
      backdrop: `rgba(0,0,123,0.4)`,
      allowOutsideClick:false,
      preConfirm
    });
}