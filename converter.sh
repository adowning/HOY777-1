#!/bin/bash

# This script sets up a Node.js tool to convert Vuetify components to Tailwind CSS.

# 1. Create the main directory for the tool
echo "Creating directory: vuetify-to-tailwind-converter..."
mkdir -p vuetify-to-tailwind-converter
cd vuetify-to-tailwind-converter

# 2. Create package.json for dependencies
echo "Creating package.json..."
cat > package.json << EOL
{
  "name": "vuetify-to-tailwind-converter",
  "version": "1.0.0",
  "description": "A script to automate the conversion of Vuetify components to Tailwind CSS.",
  "main": "convert.js",
  "type": "module",
  "scripts": {
    "start": "node convert.js"
  },
  "dependencies": {
    "glob": "^8.0.0"
  }
}
EOL

# 3. Create the main conversion script file
echo "Creating convert.js..."
cat > convert.js << 'EOL'
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

/**
 * ==============================================================================
 * VUETIFY TO TAILWIND MAPPING
 * ==============================================================================
 * This is the core of the converter. It maps Vuetify components and props
 * to HTML tags and Tailwind CSS classes.
 *
 * You can extend this map with more components and props as needed.
 *
 * NOTE: This script uses regular expressions for simplicity. For more complex
 * projects, an AST (Abstract Syntax Tree) parser would be more robust but
 * also significantly more complex to implement.
 * ==============================================================================
 */
const vuetifyToTailwindMap = {
    // Grid System
    'v-container': { tag: 'div', classes: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
    'v-row': { tag: 'div', classes: 'flex flex-wrap -mx-4' },
    'v-col': {
        tag: 'div',
        classes: 'px-4', // Base class for column padding (gutter simulation)
        propMap: (props) => {
            const classes = [];
            const cols = props.match(/cols="(\d+)"/);
            const sm = props.match(/sm="(\d+)"/);
            const md = props.match(/md="(\d+)"/);
            const lg = props.match(/lg="(\d+)"/);

            if (cols) classes.push(`w-${cols[1]}/12`);
            if (sm) classes.push(`sm:w-${sm[1]}/12`);
            if (md) classes.push(`md:w-${md[1]}/12`);
            if (lg) classes.push(`lg:w-${lg[1]}/12`);

            return classes.join(' ');
        },
    },
    'v-spacer': { tag: 'div', classes: 'flex-grow' },

    // UI Components
    'v-card': { tag: 'div', classes: 'bg-white shadow-lg rounded-lg overflow-hidden' },
    'v-card-title': { tag: 'h3', classes: 'text-xl font-semibold p-4' },
    'v-card-text': { tag: 'div', classes: 'p-4' },
    'v-card-actions': { tag: 'div', classes: 'p-4 flex justify-end space-x-2' },
    'v-btn': {
        tag: 'button',
        classes: 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        propMap: (props) => {
            const classes = [];
            if (props.includes('color="primary"')) {
                classes.push('bg-blue-500 hover:bg-blue-700 text-white');
            } else if (props.includes('color="error"')) {
                classes.push('bg-red-500 hover:bg-red-700 text-white');
            } else if (props.includes('text')) {
                 classes.push('bg-transparent text-gray-800 hover:bg-gray-200');
            } else {
                 classes.push('bg-gray-200 hover:bg-gray-300 text-gray-800');
            }
            if (props.includes('rounded')) {
                classes.push('rounded-full');
            }
            return classes.join(' ');
        },
    },
    'v-icon': { tag: 'span', classes: 'material-icons' }, // Assuming Material Icons
    'v-alert': { 
        tag: 'div', 
        classes: 'p-4 rounded-md',
        propMap: (props) => {
             if (props.includes('type="success"')) return 'bg-green-100 text-green-700';
             if (props.includes('type="error"')) return 'bg-red-100 text-red-700';
             if (props.includes('type="warning"')) return 'bg-yellow-100 text-yellow-700';
             return 'bg-blue-100 text-blue-700';
        }
    },
};


async function convertFile(filePath) {
    console.log(`- Converting: ${path.basename(filePath)}`);
    let content = await fs.readFile(filePath, 'utf8');

    for (const vuetifyTag in vuetifyToTailwindMap) {
        const mapping = vuetifyToTailwindMap[vuetifyTag];
        const { tag, classes: baseClasses = '', propMap } = mapping;

        // Regex to find opening and closing tags, capturing props
        // Opening tag: <v-tag ...props>
        const openTagRegex = new RegExp(`<${vuetifyTag}(\\s+[^>]*)?>`, 'g');
        // Closing tag: </v-tag>
        const closeTagRegex = new RegExp(`</${vuetifyTag}>`, 'g');

        content = content.replace(openTagRegex, (match, props) => {
            let combinedClasses = baseClasses;
            if (propMap && props) {
                const dynamicClasses = propMap(props.trim());
                if (dynamicClasses) {
                    combinedClasses = `${baseClasses} ${dynamicClasses}`.trim();
                }
            }
            
            // Check if there are any other props that should be preserved
            const preservedProps = (props || '')
                .replace(/(\w+)="[^"]*"/g, (propMatch, propName) => {
                    // Filter out props that were handled by propMap
                    const handledProps = ['cols', 'sm', 'md', 'lg', 'color', 'type', 'rounded', 'text'];
                    if (handledProps.includes(propName)) {
                        return '';
                    }
                    return propMatch;
                })
                .trim();
            
            return `<${tag} class="${combinedClasses}" ${preservedProps}>`;
        });
        
        content = content.replace(closeTagRegex, `</${tag}>`);
    }

    await fs.writeFile(filePath, content, 'utf8');
}

async function main() {
    console.log('🚀 Starting Vuetify to Tailwind CSS Converter...');
    const targetDir = process.argv[2];

    if (!targetDir) {
        console.error('❌ Please provide a target directory to convert.');
        console.log('   Usage: node convert.js /path/to/your/vue/project/src');
        return;
    }
    
    const absoluteTargetDir = path.resolve(targetDir);
    const backupDir = path.resolve(path.dirname(absoluteTargetDir), `${path.basename(absoluteTargetDir)}-backup-${Date.now()}`);

    try {
        console.log(`📦 Backing up original files to: ${backupDir}`);
        await fs.cp(absoluteTargetDir, backupDir, { recursive: true });
    } catch (error) {
        console.error('❌ Failed to create backup. Aborting conversion.', error);
        return;
    }

    console.log('🔍 Finding all .vue files...');
    const files = await glob('**/*.vue', { cwd: absoluteTargetDir });

    if (files.length === 0) {
        console.warn('⚠️ No .vue files found in the specified directory.');
        return;
    }

    console.log(`Found ${files.length} files to convert.`);

    for (const file of files) {
        const filePath = path.join(absoluteTargetDir, file);
        await convertFile(filePath);
    }

    console.log('\n✅ Conversion process completed!');
    console.log('👉 IMPORTANT: Please review the changes carefully.');
    console.log('   - Not all components may be converted.');
    console.log('   - You may need to manually adjust styling and layout.');
    console.log(`   - A backup of your original files is safe at: ${backupDir}`);
}

main().catch(console.error);
EOL

# 4. Install dependencies
echo "Installing dependencies (glob)..."
npm install

echo -e "\n--- Setup Complete! ---"
echo "The conversion tool is ready in the 'vuetify-to-tailwind-converter' directory."
echo -e "\n--- HOW TO USE ---"
echo "1. Navigate into the tool's directory:"
echo "   cd vuetify-to-tailwind-converter"
echo ""
echo "2. Run the converter script on your project's source folder:"
echo "   node convert.js /path/to/your/vuetify-project/src"
echo ""
echo "3. The script will create a backup of your source folder before making any changes."
echo "4. After running, check your project for the converted files and install Tailwind CSS."
echo "   (https://tailwindcss.com/docs/guides/vue-3-and-vite)"

