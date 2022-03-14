import { getItemPicUrl } from 'model/Ddragon';
import '../css/ItemList.css';
import LazyImage from './LazyImage';

interface ItemListProps {
  items?: Array<number>
  loading?: boolean,
}

export default function ItemList(props: ItemListProps) {
  if(props.loading){
    return (<div className='item-list'>
      <ul>
        <li className='loading'/>
        <li className='loading'/>
        <li className='loading'/>
        <li className='loading'/>
        <li className='loading'/>
        <li className='loading'/>
      </ul>
    </div>)
  }

  return (<div className='item-list'>
    <ul>
      {props.items!.map((i:number) => {
        return <li className='item'>{i == 0 ? '' : <LazyImage className='item-list-item' src={getItemPicUrl(i)}/>}</li>
      })}
    </ul>
  </div>)
}