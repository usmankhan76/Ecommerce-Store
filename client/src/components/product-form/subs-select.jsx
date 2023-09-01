

import React from "react";
import {  Form } from "react-bootstrap";

export default function SubsSelect() {
 

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