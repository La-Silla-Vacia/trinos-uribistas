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
        color: item.color,
        cargo: item.cargo,
        grupo: item.grupo.split(',').map(Number)
      };
      personas.push(newItem);
    }

    for (let item of newData.Grupos) {
      const newItem = {
        id: item.id,
        nombre: item.grupo,
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
    const { loading, personas, grupos } = state;

    let content = (loading) ? (<LoadScreen />) : (
      <div className={s.inner}>
        <p className={s.title}><strong>Instrucciones: </strong>Haga clic en los botones azules de la derecha para saber a que grupo pertenece cada uno de los personajes</p>
        <Graphic personas={personas} grupos={grupos} />
      </div>
    );

    return(
      <div className={cn(s.container, {[s.loading]: loading})}>
        { content }
      </div>
    )
  }
}