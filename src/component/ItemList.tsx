import { getItemPicUrl } from 'model/Ddragon';
import '../css/ItemList.css';

interface ItemListProps {
  items: Array<number>
}

export default function ItemList(props: ItemListProps) {
  return (<div className='item-list'>
    <ul>
      {props.items.map((i:number) => {
        return <li>{i == 0 ? '' : <img src={getItemPicUrl(i)}/>}</li>
      })}
    </ul>
  </div>)
}