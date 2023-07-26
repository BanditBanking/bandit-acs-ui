import styles from "./Fields.module.scss";
import cn from "classnames";

export type TextInputProps = {
    name: string;
    className?: string;
    error?: string;
    placeholder?: string;
    onChange?: (value: string) => void
    value?: string;
    noLabel?: boolean;
}


export type FormButtonProps = {
    name: string;
    className?: string;
    type?: "button";
    onClick?: () => void;
    children?: React.ReactNode;
}

export function NumberInput({ name, error, placeholder, onChange, value, noLabel }: TextInputProps) {
    return (
        <div className={cn(styles.textInput, styles.field)}>
            {!noLabel && <label htmlFor={name}>{name}<span className={styles.error}>{error}</span></label>}
            <input
                type="text"
                name={name}
                id={name}
                placeholder={placeholder ?? ""}
                onChange={(v) => onChange && onChange(v.target.value)}
                value={value}
            />
        </div>
    );
}

export function ExpiryDateInput({ name, error, className, placeholder, onChange, value, noLabel }: TextInputProps) {
    return (
        <div className={cn(className, styles.textInput, styles.field)}>
            {!noLabel && <label htmlFor={name}>{name}<span className={styles.error}>{error}</span></label>}
            <input
                type="text"
                name={name}
                id={name}
                placeholder={placeholder ?? ""}
                onChange={(v) => onChange && onChange(v.target.value)}
                value={value}
            />
        </div>
    );
}

export function CardNumberInput({ name, error, placeholder, onChange, value, noLabel }: TextInputProps) {
    return (
        <div className={cn(styles.textInput, styles.field)}>
            {!noLabel && <label htmlFor={name}>{name}<span className={styles.error}>{error}</span></label>}
            <input
                type="text"
                name={name}
                id={name}
                placeholder={placeholder ?? ""}
                onChange={(v) => onChange && onChange(v.target.value)}
                value={value}
            />
        </div>
    );
}

export function TextInput({ name, error, className, placeholder, onChange, value, noLabel }: TextInputProps) {
    return (
        <div className={cn(className, styles.textInput, styles.field)}>
            {!noLabel && <label htmlFor={name}>{name}<span className={styles.error}>{error}</span></label>}
            <input
                type="text"
                name={name}
                id={name}
                placeholder={placeholder ?? ""}
                onChange={(v) => onChange && onChange(v.target.value)}
                value={value}
            />
        </div>
    );
}

export function PasswordInput({ name, error, placeholder, onChange, value, noLabel }: TextInputProps) {
    return (
        <div className={cn(styles.textInput, styles.field)}>
            <label htmlFor={name}>{name}<span className={styles.error}>{error}</span></label>
            <input type="password" name={name} id={name} placeholder={placeholder ?? ""} onChange={(e) => onChange && onChange(e.target.value)} />
        </div>
    );
}

export function ErrorText({ text }: { text?: string }) {
    return (
        <p className={styles.errorText}>
            {text}
        </p>
    );
}

export function FormButton({ name, type, className, onClick, children }: FormButtonProps) {
    return (
        <button className={cn(className, styles.formButton)} type={type ?? "button"} id={name} onClick={onClick}>
            {children}
        </button>
    );
}