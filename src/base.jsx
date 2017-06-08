import { h, render, Component } from 'preact';
import cn from 'classnames';

import getData from './Scripts/getData';
import LoadScreen from './Components/LoadScreen';
import Graphic from './Components/Graphic';

import s from './base.css';

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      personas: [],
      grupos: [],
      loading: true
    };

    this.setData = this.setData.bind(this);
  }

  setData(newData) {
    const personas = [];
    const grupos = [];

    for (let item of newData.Personas) {
      const newItem = {
        nombre: item.nombre,
        foto: item.foto,
        partido: item.partido,
        cargo: item.cargo,
        grupo: item.grupo.split(',')
      };
      personas.push(newItem);
    }

    for (let item of newData.Grupos) {
      const newItem = {
        id: item.id,
        grupo: item.grupo,
        texto: item.texto
      };
      grupos.push(newItem);
    }

    this.setState({ personas: personas, grupos: grupos, loading: false });
  }

  componentWillMount() {
    getData(this.setData);
  }

  render(props, state) {
    const { loading, personas } = state;

    let content = (loading) ? (<LoadScreen />) : (
      <div className={s.inner}>
        <h2 className={s.title}>Hello coaliciones_2018!</h2>
        <Graphic personas={personas} />
      </div>
    );

    return(
      <div className={cn(s.container, {[s.loading]: loading})}>
        { content }
      </div>
    )
  }
}