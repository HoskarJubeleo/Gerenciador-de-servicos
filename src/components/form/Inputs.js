import styles from './Inputs.module.css'

function Inputs ({type, text, name, placeholder, handleOnChange, value}){
    return (
        <div className={styles.form_control}>
            <label htmlFrom={name}>{text}:</label>
            <input type={type} name={name} placeholder={placeholder} id={name} onChange={handleOnChange} value={value} required />
        </div>
    )
}

export default Inputs