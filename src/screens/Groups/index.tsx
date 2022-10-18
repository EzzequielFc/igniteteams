import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpyt";
import { Button } from "@components/Button";

import { Container } from "./styles";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigate = useNavigation();

  function handleNewGroup() {
    navigate.navigate("new");
  }

  async function fetch() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigate.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)}/>}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Quel tal cadastrar a primeira turma?" />
        )}
      />

      <Button title="Criar nova Turma" onPress={handleNewGroup} />
    </Container>
  );
}
