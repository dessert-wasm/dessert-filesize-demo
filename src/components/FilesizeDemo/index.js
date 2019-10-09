import React, { Component } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Columns, Box, Form } from 'react-bulma-components'

import filesize from 'filesize';

let dessert_filesize;

class FilesizeDemo extends Component {
  state = {
    options: {
      base: 2,
      bits: false,
      exponent: -1,
      fullform: false,
      locale: false,
      round: 2,
      separator: ".",
      spacer: " ",
      standard: "jedec",
      unix: false,
    },
    value: 500,
    dessert_result: null,
    filesize_result: null,
  };

  componentDidMount = async () => {
    dessert_filesize = await (
      await import('dessert-filesize')
    ).default;
    this.updateResult();
  };

  updateResult = () => {
    const { value, options } = this.state;
    const fz_res = filesize(value, options);
    const dessert_fz_res = dessert_filesize(value, options);
    this.setState({
      ...this.state,
      filesize_result: fz_res,
      dessert_result: dessert_fz_res,
    });
  };

  handleValueInput = e => {
    this.setState({
      ...this.state,
      value: Number(e.target.value)
    }, this.updateResult);
  };

  handleInput = e => {
    const { name, value, type } = e.target;

    const getRealValue = () => {
      switch (type) {
        case "checkbox":
          return e.target.checked;
        case "number":
          return Number(value);
        default:
          return value;
      }
    }


    let newState = this.state;
    newState.options[name] = getRealValue();
    this.setState(newState, this.updateResult);
  };

  MyCustomInput = props => {
    const { name, type } = props;
    let input;
    switch (type) {
      case "checkbox":
        input = <Form.Checkbox name={name} checked={this.state.options[name]} onChange={this.handleInput} />
        break;
      case "select":
        input = (<Form.Select name={name} value={this.state.options[name] || ""} onChange={this.handleInput}>
          {props.children}
        </Form.Select>)
        break;
      default:
        input = <Form.Input name={name} key={name} value={this.state.options[name].toString()} type={type} onChange={this.handleInput} />
        break;
    }

    return (
      <>
        <Form.Field>
          <Form.Control>
            <Form.Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>
            {input}
          </Form.Control>
        </Form.Field>
      </>
    )
  };

  render = () => {
    const { value, options } = this.state;
    const MyCustomInput = this.MyCustomInput;
    return (
      <Container>
        <Columns>
          <Columns.Column size="half">
            <MyCustomInput name="base" type="number" />
            <MyCustomInput name="bits" type="checkbox" />
            <MyCustomInput name="exponent" type="number" />
            <MyCustomInput name="fullform" type="checkbox" />
            <MyCustomInput type="select" name="locale" value={options.locale} onChange={this.handleInput}>
              <option value="en-US">en-US</option>
              <option value="fr-FR">fr-FR</option>
              <option value="ko-KR">ko-KR</option>
              <option value="de">de</option>
              <option value="ar-EG">ar-EG</option>
            </MyCustomInput>
            <MyCustomInput name="round" type="number" />
            <MyCustomInput name="separator" />
            <MyCustomInput name="spacer" />
            <MyCustomInput type="select" name="standard" value={options.standard} onChange={this.handleInput}>
              <option value="jedec">jedec</option>
              <option value="iec">iec</option>
            </MyCustomInput>
            <MyCustomInput name="unix" type="checkbox" />
          </Columns.Column>
          <Columns.Column size="half">
            <Form.Field size="small">
              <Form.Label >
                Value
              </Form.Label>
              <Form.Control>
                <Form.Input value={value.toString()} type="number" onChange={this.handleValueInput} />
              </Form.Control>
            </Form.Field>
            <Box>
              Filesize: {this.state.filesize_result}
            </Box>
            <Box>
              Dessert : {this.state.dessert_result}
            </Box>
          </Columns.Column>
        </Columns>
      </Container >
    );
  }
}

export default FilesizeDemo;
