// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useMainStore } from '../src/store/index.js';


describe('Main Store', () => {
  let store;
 
  beforeEach(() => {
    
    // Create a fresh pinia instance
    setActivePinia(createPinia()); 
    store = useMainStore();
  }); 

  describe('initial state', () => {
    it('should initialize with empty contacts array', () => {
      expect(store.contacts).toEqual([]);
      expect(store.cards).toEqual([]);
    });
  });

  describe('adding contacts', () => {
    const testContact = {
      id: 'test-id',
      name: 'John Doe',
      organization: 'Test Org',
    };

    afterEach(() => {
      localStorage.clear()
    })

    it('should add a new contact object to the store', () => {
      store.setContact(testContact);
      
      expect(store.contacts).toHaveLength(1);
      expect(store.contacts[0]).toEqual(testContact);
      expect(store.cards).toHaveLength(1);
    });

    it('should add multiple contact objects to the store', () => {
      const testContact1 = { ...testContact, id: 'test-id-1', organization: 'Test Org 1' };
      const testContact2 = { ...testContact, id: 'test-id-2', name: 'Jane Smith', organization: 'Test Org 2' };
      
      store.setContact(testContact1);
      store.setContact(testContact2);
      
      expect(store.contacts).toHaveLength(2);
      expect(store.contacts).toContainEqual(testContact1);
      expect(store.contacts).toContainEqual(testContact2);
    });
  });

  describe('retrieving contacts', () => {
    const testContact1 = { id: 'test-id-1', name: 'John Doe', organization: 'Test Org 1' };
    const testContact2 = { id: 'test-id-2', name: 'Jane Smith', organization: 'Test Org 2' };

    beforeEach(() => {
      store.setContact(testContact1);
      store.setContact(testContact2);
    });

  afterEach(() => {
    localStorage.clear()
  })

    it('should retrieve a contact by ID using getContact', () => {
      expect(store.getContact('test-id-1')).toEqual(testContact1);
    });

    it('should return undefined for non-existent contact ID', () => {
      expect(store.getContact('non-existent-id')).toBeUndefined();
    });

    it('should retrieve a contact by index using getContactAt', () => {
      expect(store.getContactAt(0)).toEqual(testContact1);
      expect(store.getContactAt(1)).toEqual(testContact2);
    });

    it('should return undefined for invalid index in getContactAt', () => {
      expect(store.getContactAt(-1)).toBeUndefined();
      expect(store.getContactAt(99)).toBeUndefined();
    });
  });

  describe('updating contacts', () => {

    

    afterEach(() => {
      localStorage.clear()
    })
    it('should update an existing contact by index', () => {
      const originalContact = { id: 'test-id', name: 'John Doe', organization: 'Original Org' };
      const updatedContact = { ...originalContact, name: 'John Doe Updated', organization: 'Updated Org' };
      
      store.setContact(originalContact);
      expect(store.contacts[0].organization).toBe('Original Org');
      
      store.setContact(updatedContact, 0);
      
      expect(store.contacts[0].name).toBe('John Doe Updated');
      expect(store.contacts[0].organization).toBe('Updated Org');
    });
  });

  describe('removing contacts', () => {
    const testContact1 = { id: 'test-id-1', name: 'John Doe', organization: 'Test Org 1' };
    const testContact2 = { id: 'test-id-2', name: 'Jane Smith', organization: 'Test Org 2' };
    const testContact3 = { id: 'test-id-3', name: 'Bob Johnson', organization: 'Test Org 3' };

    beforeEach(() => {
      store.setContact(testContact1);
      store.setContact(testContact2);
      store.setContact(testContact3);
    });

    it('should remove a contact by ID', () => {
      expect(store.contacts).toHaveLength(3);
      
      store.removeContact(testContact2);
      
      expect(store.contacts).toHaveLength(2);
      expect(store.contacts).not.toContainEqual(testContact2);
      expect(store.contacts).toEqual([testContact1, testContact3]);
    });
  });

  describe('localStorage integration', () => {
    it('should use localStorage for persistence', async () => {
      const testContact = { id: 'test-id-1', name: 'John Doe', organization: 'Test Org 1' };
    
      // Initially localStorage should have the default value
      const initialStoredValue = localStorage.getItem('cards');
      expect(initialStoredValue).not.toBeNull();
      
      store.setContact(testContact);
      
      // Give Vue time to update the reactive reference
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Check that the store's data is reflected in localStorage
      const updatedStoredValue = localStorage.getItem('cards');
      expect(updatedStoredValue).not.toBeNull();
      
      const parsedData = JSON.parse(updatedStoredValue);
      expect(parsedData.contacts).toContainEqual(testContact);
    });
  });
});