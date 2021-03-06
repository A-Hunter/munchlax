package com.data.warehouse.service;


import com.data.warehouse.entity.Person;

import java.util.List;
import java.util.Map;

public interface PersonService<T> {

    Person findById(String id, String index, String type);

    void savePerson(T person);

    void updatePerson(T person, String index, String type, String id);

    void deletePerson(T entity);

    void deletePersonById(String index, String type, String id);

    List<T> findAllPersons(String index, String type);

    public boolean isPersonExist(String index, Map<String, Object> entityAsMap);

    List<Person> searchPersons(String index, Map<String, Object> searchCriteria);
}
