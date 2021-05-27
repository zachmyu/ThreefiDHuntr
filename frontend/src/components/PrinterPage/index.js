import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { getOnePokemon } from '../store/pokemon';
// import PokemonItems from './PokemonItems';
// import EditPokemonForm from './EditPokemonForm';
// import EditItemForm from './EditItemForm';
//NEEEEEED TO UPDATE PRINTER DETAIL
const PrinterPage = () => {

  return (
    <div>
      <h2> printer page</h2>
    </div>
  )
  // // const { pokemonId } = useParams();
  // const pokemon = useSelector(state => state.pokemon[pokemonId]);
  // const dispatch = useDispatch();
  // const [showEditPokeForm, setShowEditPokeForm] = useState(false);
  // const [editItemId, setEditItemId] = useState(null);

  // useEffect(() => {
  //   dispatch(getOnePokemon(pokemonId));
  //   setShowEditPokeForm(false);
  //   setEditItemId(null);
  // }, [dispatch, pokemonId]);

  // if (!pokemon || !pokemon.moves) {
  //   return null;
  // }

  // let content = null;

  // if (editItemId) {
  //   content = (
  //     <EditItemForm pokemon={pokemon} itemId={editItemId} hideForm={() => setEditItemId(null)} />
  //   )
  // } else if (showEditPokeForm && pokemon.captured) {
  //   content = (
  //     <EditPokemonForm pokemon={pokemon} hideForm={() => setShowEditPokeForm(false)} />
  //   )
  // } else {
  //   content = (
  //     <div className="pokemon-detail-lists">
  //       <div>
  //         <h2>Information</h2>
  //         <ul>
  //           <li>
  //             <b>No</b> {pokemon.no}
  //           </li>
  //           <li>
  //             <b>Type</b> {pokemon.type}
  //           </li>
  //           <li>
  //             <b>Attack</b> {pokemon.attack}
  //           </li>
  //           <li>
  //             <b>Defense</b> {pokemon.defense}
  //           </li>
  //           <li>
  //             <b>Moves</b>
  //             <ul>
  //               {pokemon.moves && pokemon.moves.map((move) => (
  //                 <li key={move}>{move}</li>
  //               ))}
  //             </ul>
  //           </li>
  //         </ul>
  //       </div>
  //       <div>
  //         <h2>Items</h2>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th></th>
  //               <th>Name</th>
  //               <th>Happiness</th>
  //               <th>Price</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <PokemonItems pokemon={pokemon} setEditItemId={setEditItemId} />
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="pokemon-detail">
  //     <div className={`pokemon-detail-image-background`}>
  //       <div
  //         className="pokemon-detail-image"
  //         style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}
  //       ></div>
  //       <div>
  //         <h1 className="bigger">{pokemon.name}</h1>
  //         {(!showEditPokeForm && pokemon.captured) && (
  //           <button onClick={() => setShowEditPokeForm(true)}>Edit</button>
  //         )}
  //       </div>

  //     </div>
  //     {content}
  //   </div>
  // );
};

export default PrinterPage;
