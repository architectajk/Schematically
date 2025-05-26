import React, { useContext } from 'react';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';

export default function PrivacyPolicy() {
  const { mode } = useContext(SchematicContext);
  const textClass = `text-${mode === 'light' ? 'dark' : 'light'}`;

  return (
    <div className={`container py-4 ${textClass}`}>
      <h1>Privacy Policy</h1>
      <p>Effective Date: May 26, 2025</p>

      <p><strong>Schematically</strong> is an open-source platform committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.</p>

      <h4>1. Information We Collect</h4>
      <ul>
        <li>No personal data is collected unless you contact us directly.</li>
        <li>We may collect anonymized analytics to understand usage patterns (e.g., via GitHub Pages or Google Analytics).</li>
      </ul>

      <h4>2. Use of Information</h4>
      <p>We use anonymized data to improve the platform's performance and user experience. No personally identifiable data is stored or shared.</p>

      <h4>3. Open Source & GitHub</h4>
      <p>Any contributions, issues, or pull requests submitted to the <a href="https://github.com/architectajk" target="_blank" rel="noopener noreferrer">GitHub repository</a> are public.</p>

      <h4>4. Contact</h4>
      <p>For any privacy concerns, email us at: <a href="mailto:architect.ajk@gmail.com">architect.ajk@gmail.com</a></p>

      <p>This privacy policy is subject to updates. Please check this page periodically.</p>
            <h1>Terms of Use</h1>
      <p>By using <strong>Schematically</strong>, you agree to the following terms:</p>

      <ul>
        <li>All content is provided "as-is" without warranties.</li>
        <li>You are free to use, modify, and share the tools, subject to the open-source license.</li>
        <li>Do not use Schematically for illegal or harmful purposes.</li>
      </ul>

      <p>These terms are subject to change without notice.</p>
      <h1>Open Source License</h1>
      <p>This project is licensed under the MIT License — see the <a href="https://github.com/architectajk/Schematically/blob/main/LICENSE.txt" target="_blank" rel="noopener noreferrer">LICENSE file</a> for details.</p>
    </div>
  );
}
