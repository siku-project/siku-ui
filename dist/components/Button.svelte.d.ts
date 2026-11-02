import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { IconName } from '../icons/icons';
type Props = Omit<HTMLButtonAttributes, 'children'> & Pick<HTMLAnchorAttributes, 'target' | 'rel' | 'download'> & {
    /** Rend un lien <a> avec le même rendu : navigation plutôt qu'action. */
    href?: string;
    /** primary : l'action qui fait avancer la tâche. secondary par défaut. */
    variant?: 'primary' | 'secondary' | 'ghost' | 'quiet' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    /** Touche affichée à droite (« E », « Espace »). */
    key?: string;
    icon?: IconName;
    /** Bouton carré sans texte : `label` devient le nom accessible. */
    iconOnly?: boolean;
    label?: string;
    loading?: boolean;
    block?: boolean;
    /** Bouton rond : action flottante, bouton de barre. */
    round?: boolean;
    children?: Snippet;
};
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
