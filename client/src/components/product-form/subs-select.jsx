// import { Select } from 'antd';
// import React from 'react';
// import { useState } from 'react';
// const { Option } = Select;

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };
// const SubsSelect = ({subs}) => {
  
//   // const {click,setClick}=useState(false)

//  return <Select
//     mode="multiple"
//     // open={true}
//     // onClick={()=> setClick(true)}
//     style={{
//       width: '100%',
//     }}
//     placeholder="select one country"
//     defaultValue={subs}
//     onChange={handleChange}
    
//   >
//     {/* <Option value="china" label="China">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="China">
//           🇨🇳
//         </span>
//         China (中国)
//       </div>
//     </Option>
//     <Option value="usa" label="USA">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="USA">
//           🇺🇸
//         </span>
//         USA (美国)
//       </div>
//     </Option>
//     <Option value="japan" label="Japan">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="Japan">
//           🇯🇵
//         </span>
//         Japan (日本)
//       </div>
//     </Option>
//     <Option value="korea" label="Korea">
//       <div className="demo-option-label-item">
//         <span role="img" aria-label="Korea">
//           🇰🇷
//         </span>
//         Korea (韩国)
//       </div>
//     </Option> */}
//     <Option value="ONe">One</Option>
//     <Option value="two">Two</Option>
//     <Option value="three">Three</Option>
//   </Select>
// };

// export default SubsSelect;


// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelect() {
//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a the stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-name-label">Name</InputLabel>
//         <Select
//           labelId="demo-multiple-name-label"
//           id="demo-multiple-name"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Name" />}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem
//               key={name}
//               value={name}
//               style={getStyles(name, personName, theme)}
//             >
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

export default function SubsSelect() {
  const [field, setField] = useState([]);

  return (
    <Form.Group controlId="my_multiselect_field" className="input-group mb-3">
      <Form.Control className='form-select'  as="select" multiple onChange={()=>{}}>
        <option value="field1">Field 1</option>
        <option value="field2">Field 2</option>
        <option value="field3">Field 3</option>
      </Form.Control>
    </Form.Group>
  );
}