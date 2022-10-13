import { Container,FilerStyleProps,Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & FilerStyleProps & {
  title: string;
}

export function Filter({title, isActive = false, ...rest}: Props) {
  return(
    <Container {...rest} isActive={isActive}>
      <Title>{title}</Title>
    </Container>
  )
}