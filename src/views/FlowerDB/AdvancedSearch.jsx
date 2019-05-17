import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  ButtonGroup,
} from 'reactstrap';
import { FiChevronDown } from 'react-icons/fi';
import { useQuery } from 'react-apollo-hooks';
import {
  GET_PLANT_GROUNDTYPES,
  GET_PLANT_PERIODICITIES,
  GET_PLANT_SHAPES,
  GET_PLANT_TYPES,
} from 'apollo/queries/plant_category.js';

function SelectDropdown({
  title,
  query: { query, accessKey },
  setState,
  state,
}) {
  const [open, setOpen] = useState(false);
  const { data, error, loading } = useQuery(query);
  const isActive = item => state.find(obj => obj.id === item.id) !== undefined;
  const toggleItem = item => {
    if (isActive(item)) setState(state.filter(obj => obj.id !== item.id));
    else setState([...state, item]);
  };
  const toggle = e => {
    if (e.gar_drop_item) {
      e.gar_drop_item = false;
      return;
    }
    setOpen(!open);
  };
  const itemList = () => {
    let output = '';

    for (let i = 0; i < state.length; i++) {
      if (i + 1 === state.length) output += state[i].name;
      else output += `${state[i].name}, `;
    }
    return output;
  };

  if (error) return "Une erreur c'est produite";

  return (
    <Dropdown className='' direction='down' isOpen={open} toggle={toggle}>
      <DropdownToggle
        style={{ fontSize: '85%' }}
        className={`text-left text-truncate text-uppercase btn-block rounded-0 bg-white pr-5 ${
          state.length > 0 ? 'text-primary' : 'text-muted'
        }`}
      >
        {state.length > 0 ? itemList() : title}
        <FiChevronDown
          style={{ left: '92%' }}
          className='position-absolute text-muted'
        />
      </DropdownToggle>
      {state.length > 0 ? (
        <span className='small text-muted'>
          <span className='text-primary'>{state.length}</span> filtre(s)
          actif(s)
        </span>
      ) : null}
      <DropdownMenu className='w-100'>
        {loading ? (
          <DropdownItem className='px-3 py-2'>
            <span className='font-weight-bold small text-muted'>
              Chargement...
            </span>
          </DropdownItem>
        ) : (
          data[accessKey].map(item => (
            <DropdownItem
              key={`${title}-${item.name}`}
              className='px-3 py-2'
              onClick={e => {
                e.gar_drop_item = true;
                toggleItem(item);
                e.preventDefault();
              }}
            >
              <span className='font-weight-bold small text-muted'>
                {item.name}
              </span>
              <div className='custom-control custom-checkbox float-right'>
                <input
                  type='checkbox'
                  className='custom-control-input'
                  id='customCheck1'
                  checked={isActive(item)}
                  onChange={e => {
                    e.gar_drop_item = true;
                    toggleItem(item);
                    e.preventDefault();
                  }}
                />
                <label
                  className='custom-control-label'
                  htmlFor='customCheck1'
                />
              </div>
            </DropdownItem>
          ))
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

// function SelectRange({ title, min, max, setState, state }) {
//   return <div>
//     <div className="text-left text-uppercase small text-muted">{title}</div>
//     <Range className="mt-3 ml-1"/>
//   </div>
// }

export function AdvancedSearch({ onSearch }) {
  const DEFAULT_FILTER_STATE = {
    sunNeed: { low: null, high: null },
    waterNeed: { low: null, high: null },
    phs: { low: null, hight: null },
    blossoming: { from: null, to: null },
    planting_period: { from: null, to: null },
    rusticity: { low: null, high: null },
    periodicities: [],
    shapes: [],
    groundType: [],
    typeIds: [],
    colors: [],
  };
  const [filters, setFilters] = useState(DEFAULT_FILTER_STATE);

  const onKeyPress = e => {
    if (e.key === 'Enter') onSearch(filters);
  };

  return (
    <React.Fragment>
      <Row className='mt-2'>
        <Col className='my-2' xs='6' md='4' lg='3' onKeyPress={onKeyPress}>
          <SelectDropdown
            title='Type de sols'
            query={{
              query: GET_PLANT_GROUNDTYPES,
              accessKey: 'getGroundTypes',
            }}
            state={filters.groundType}
            setState={items => setFilters({ ...filters, groundType: items })}
          />
        </Col>
        <Col className='my-2' xs='6' md='4' lg='3'>
          <SelectDropdown
            title='Periodicité'
            query={{
              query: GET_PLANT_PERIODICITIES,
              accessKey: 'getPeriodicities',
            }}
            state={filters.periodicities}
            setState={items => setFilters({ ...filters, periodicities: items })}
          />
        </Col>
        <Col className='my-2' xs='6' md='4' lg='3'>
          <SelectDropdown
            title='Silhouette'
            query={{
              query: GET_PLANT_SHAPES,
              accessKey: 'getShapes',
            }}
            state={filters.shapes}
            setState={items => setFilters({ ...filters, shapes: items })}
          />
        </Col>
        <Col className='my-2' xs='6' md='4' lg='3'>
          <SelectDropdown
            title='Type de plante'
            query={{
              query: GET_PLANT_TYPES,
              accessKey: 'getTypes',
            }}
            state={filters.typeIds}
            setState={items => setFilters({ ...filters, typeIds: items })}
          />
        </Col>
      </Row>
      <Row className='mt-3 justify-content-end'>
        <Col xs='4' md='3' lg='2'>
          <ButtonGroup className='float-right'>
            <Button
              style={{ fontSize: '80%' }}
              className='bg-white rounded-0 text-uppercase text-muted border-0'
              onClick={() => setFilters(DEFAULT_FILTER_STATE)}
            >
              Reset
            </Button>
            <Button
              color='primary'
              style={{ fontSize: '80%' }}
              className='rounded-0 text-uppercase border-0'
              onClick={() => onSearch(filters)}
            >
              Rechercher
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
}
