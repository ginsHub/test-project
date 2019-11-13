@isTest
public with sharing class AnimalLocatorTest {
    
    @isTest static void testAnimalLocator(){

        Test.setMock(HTTPCallOutMock.class, new AnimalLocatorMock());
        String response = AnimalLocator.getAnimalNameById(1);
        System.debug('ITO ANG NAME '+response);
    }
}
