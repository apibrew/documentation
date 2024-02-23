package io.company.model;

import java.util.Objects;
import io.apibrew.client.EntityInfo;
import io.apibrew.client.Entity;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.annotation.processing.Generated;

/**
 * This code is generated by apibrew.io. Please do not modify this file.
 */
@Generated("io.apibrew.client.gen.EntityGenerator")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Book extends Entity {

    private java.util.UUID id;

    private String title;

    private String description;

    private int version;

    public static final String NAMESPACE = "default";
    public static final String RESOURCE = "Book";

    @JsonIgnore
    public static final EntityInfo<Book> entityInfo = new EntityInfo<>("default", "Book", Book.class, "book");



    public Book() {
    }

    public java.util.UUID getId() {
        return id;
    }

    public void setId(java.util.UUID id) {
        this.id = id;
    }

    public Book withId(java.util.UUID id) {
        this.id = id;

        return this;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Book withTitle(String title) {
        this.title = title;

        return this;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Book withDescription(String description) {
        this.description = description;

        return this;
    }
    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public Book withVersion(int version) {
        this.version = version;

        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Book)) {
            return false;
        }

        Book obj = (Book) o;

        if (!Objects.equals(this.id, obj.id)) {
            return false;
        }
        if (!Objects.equals(this.title, obj.title)) {
            return false;
        }
        if (!Objects.equals(this.description, obj.description)) {
            return false;
        }
        if (!Objects.equals(this.version, obj.version)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        if (id == null) {
            return super.hashCode();
        }

        return id.hashCode();
    }
}


