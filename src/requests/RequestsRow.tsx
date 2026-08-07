import { IRequests } from "./IRequests";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { requestsAPI, } from "./RequestsAPI";
 import Dropdown from "react-bootstrap/Dropdown";
 import { Link } from "react-router-dom";
 import toast from "react-hot-toast";




interface IRequestsRowProps {
  request: IRequests;
  onRemove: (request: IRequests) => void;
}

 function RequestsRow({ request, onRemove }: IRequestsRowProps) {
  return (
    <tr>
      <th scope="row">{request.id}</th>
      <td>{request.description}</td>
      <td className="text-body-secondary small text-wrap">{request.justification || "—"}</td>
      <td>
        <span className={`badge ${getTextBackgroundByStatus(request.status)}`}>
          {request.status}
        </span>
      </td>
      <td>${request.total}</td>
    
      <td>
        {request.deliveryMode}
      </td>
 
       <td>
         <Dropdown className="d-inline">
           <Dropdown.Toggle className="btn btn-light no-caret" style={{ background: "none" }}>
             <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
               <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
             </svg>
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item as={Link} to={`/requests/detail/${request.id}`}>View</Dropdown.Item>
             <Dropdown.Item as={Link} to={`/requests/edit/${request.id}`}>Edit</Dropdown.Item>
             <Dropdown.Item as="a" href="#" onClick={async (event) => {
               event.preventDefault();
               if (confirm("Are you sure you want to delete this order?")) {
                 if (request.id) {
                   try {
                     await requestsAPI.delete(request.id);
                     onRemove(request);   // tell the parent to drop the row
                     toast.success("Successfully deleted.");
                   } catch (error: any) {
                     toast.error(error.message, { duration: 6000 });
                   }
                 }
               }
             }}>
               Delete
             </Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>
       </td>
      </tr>
    );
  }

export default RequestsRow;