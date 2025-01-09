<script lang="ts">
  // Add any scripts you need here
</script>

<style>
  /* Container for the form */
  .form-container {
    max-width: 800px;
    margin: auto;
    padding: 1.5rem;
  }

  /* Header of the form */
  .form-header {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  /* Grouping of form elements */
  .form-group {
    margin-bottom: 1rem;
  }

  /* Label for form inputs */
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #374151;
  }

  /* Input fields styling */
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    font-size: 1rem;
    color: #374151;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  /* Button styling */
  .form-button {
    background-color: #3b82f6;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  /* Button hover effect */
  .form-button:hover {
    background-color: #2563eb;
  }
</style>

<!-- Main container for the form -->
<div class="form-container">
  <!-- Form header -->
  <div class="form-header">User Management</div>
  <!-- Form element -->
  <form>
    <!-- Username input group -->
    <div class="form-group">
      <label class="form-label" for="username">Username</label>
      <input id="username" type="text" class="form-input" placeholder="Enter username" />
    </div>
    <!-- Email input group -->
    <div class="form-group">
      <label class="form-label" for="email">Email</label>
      <input id="email" type="email" class="form-input" placeholder="Enter email" />
    </div>
    <!-- Role selection group -->
    <div class="form-group">
      <label class="form-label" for="role">Role</label>
      <select id="role" class="form-input">
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="manager">Manager</option>
      </select>
    </div>
    <!-- Submit button -->
    <button type="submit" class="form-button">Submit</button>
  </form>
</div>
