import { CardStyle } from "../style/CardsStyle"
import Typography from "@mui/material/Typography"

export default function Card({ title_card, value_card, icon_card, bgColor, colorCard }) {

    const StylesVariableCard = {
        backgroundColor: bgColor,
        color: colorCard,
    }

    return (
        <CardStyle style={StylesVariableCard}>
            <div>
                <span>
                    <Typography variant='subtitle1'>
                        {title_card}
                    </Typography>
                </span>
                {icon_card}
            </div>

            <Typography variant='h4'>
                {value_card}
            </Typography>

        </CardStyle>
    )
}